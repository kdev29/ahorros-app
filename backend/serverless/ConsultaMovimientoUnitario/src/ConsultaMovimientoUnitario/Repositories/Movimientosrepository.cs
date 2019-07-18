using AhorrosApp.Libs.Models;
using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.DataModel;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AhorrosApp.Libs.Repositories
{
    public class Movimientosrepository: IMovimientosRepository
    {
        private readonly DynamoDBContext _context;

        public Movimientosrepository(IAmazonDynamoDB awsClient)
        {
            _context = new DynamoDBContext(awsClient);
        }

        public async Task AddMovieDB(MovimientoDB movimiento)
        {
            await _context.SaveAsync(movimiento);
        }

        public async Task<IEnumerable<MovimientoDB>> GetAll()
        {
            return await _context.ScanAsync<MovimientoDB>(new List<ScanCondition>()).GetRemainingAsync();
        }

        public async Task<MovimientoDB> GetMovimientoDB(string cuenta, int movimiento)
        {
            return await _context.LoadAsync<MovimientoDB>(cuenta, movimiento);
        }
    }
}
