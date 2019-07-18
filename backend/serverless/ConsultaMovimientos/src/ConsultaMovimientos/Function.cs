using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using AhorrosApp.Libs.Contracts;
using AhorrosApp.Libs.Mapper;
using AhorrosApp.Libs.Repositories;
using AhorrosApp.NetCore.Api.Services;
using Amazon;
using Amazon.DynamoDBv2;
using Amazon.Lambda.APIGatewayEvents;
using Amazon.Lambda.Core;
using Newtonsoft.Json;

// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class.
[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.Json.JsonSerializer))]

namespace ConsultaMovimientos
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
        public async Task<APIGatewayProxyResponse> FunctionHandler(APIGatewayProxyRequest input, ILambdaContext context)
        {

            LogMessage(context, "Starting Execution");

            try
            {
                AmazonDynamoDBConfig clientConfig = new AmazonDynamoDBConfig();                
                clientConfig.RegionEndpoint = RegionEndpoint.USEast1;
                AmazonDynamoDBClient client = new AmazonDynamoDBClient(clientConfig);

                var repo = new Movimientosrepository(client);
                var mapper = new Mapper();
                var _service = new MovimientosService(repo, mapper);
                
                var results = await _service.GetAllItems();

                var response = CreateResponse(results);
                LogMessage(context, "Execution Completed");

                return response;
            }
            catch (Exception e)
            {
                LogMessage(context, "Error: " + e.ToString());

                return CreateResponse(null);
            }
        }

        APIGatewayProxyResponse CreateResponse(IEnumerable<MovimientosResponse> result)
        {
            int statusCode = (result != null) ?
                (int)HttpStatusCode.OK :
                (int)HttpStatusCode.InternalServerError;

            string body = (result != null) ?
                JsonConvert.SerializeObject(result) : string.Empty;

            var response = new APIGatewayProxyResponse
            {
                StatusCode = statusCode,
                Body = body,
                Headers = new Dictionary<string, string>
                {
                    { "Content-Type", "application/json" },
                    { "Access-Control-Allow-Origin", "*" }
                }
            };

            return response;
        }

        void LogMessage(ILambdaContext ctx, string msg)
        {
            ctx.Logger.LogLine(
                string.Format("{0}:{1} - {2}",
                    ctx.AwsRequestId,
                    ctx.FunctionName,
                    msg));
        }
    }
}

