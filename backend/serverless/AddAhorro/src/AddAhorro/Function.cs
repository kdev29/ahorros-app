using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AhorrosApp.Libs.Contracts;
using AhorrosApp.Libs.Mapper;
using AhorrosApp.Libs.Repositories;
using AhorrosApp.NetCore.Api.Services;
using Amazon;
using Amazon.DynamoDBv2;
using Amazon.Lambda.Core;
using Newtonsoft.Json;

// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class.
[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.Json.JsonSerializer))]

namespace AddAhorro
{
    public class Function
    {

        /// <summary>
        /// A simple function that takes a string and does a ToUpper
        /// </summary>
        /// <param name="input"></param>
        /// <param name="context"></param>
        /// <returns></returns>
        [LambdaSerializer(typeof(Amazon.Lambda.Serialization.Json.JsonSerializer))]
        public async Task<Response> FunctionHandler(MovimientosRequest input, ILambdaContext context)
        {
            LogMessage(context, "Starting Execution");
            LogMessage(context, JsonConvert.SerializeObject(input));

            try
            {
                AmazonDynamoDBConfig clientConfig = new AmazonDynamoDBConfig();
                clientConfig.RegionEndpoint = RegionEndpoint.USEast1;
                AmazonDynamoDBClient client = new AmazonDynamoDBClient(clientConfig);

                var repo = new Movimientosrepository(client);
                var mapper = new Mapper();
                var _service = new MovimientosService(repo, mapper);
                var totalItems = await _service.GetAllItems();
                var movimientoID = 1;

                if(totalItems.ToList().Count > 0)
                {
                    movimientoID = totalItems.Max(m => m.MovimientoID) + 1;
                    input.MovimientoID = movimientoID;
                }
                


                await _service.AddMovimiento(input);

                var response = CreateResponse(error: false, $"Movimiento {movimientoID} creado correctamente");
                LogMessage(context, "Execution Completed");

                return response;
            }
            catch (Exception e)
            {
                LogMessage(context, "Error: " + e.ToString());

                return CreateResponse(error: true, message: e.Message);
            }
        }

        private void LogMessage(ILambdaContext ctx, string msg)
        {
            ctx.Logger.LogLine(
                string.Format("{0}:{1} - {2}",
                    ctx.AwsRequestId,
                    ctx.FunctionName,
                    msg));
        }

        private Response CreateResponse(bool error, string message)
        {
            return new Response()
            {
                Codigo = error ? 500 : 200,
                Message = message
            };
        }

        public class Response
        {
            public int Codigo { get; set; }
            public string Message { get; set; }

            public Response()
            {
                Message = "";
                Codigo = 200;
            }
        }
    }
}
