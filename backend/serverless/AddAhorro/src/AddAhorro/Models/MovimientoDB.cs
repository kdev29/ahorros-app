using Amazon.DynamoDBv2.DataModel;
using System;
using System.Collections.Generic;
using System.Text;

namespace AhorrosApp.Libs.Models
{
    [DynamoDBTable("movimientosahorro")]
    public class MovimientoDB
    {
        [DynamoDBHashKey]
        public string CUENTA { get; set; }
        [DynamoDBRangeKey]
        public int MOVIMIENTOID { get; set; }
        public string COMENTARIO { get; set; }
        public string FECHA { get; set; }
        public decimal MONTO { get; set; }
        public string TIPOMOVIMIENTO { get; set; }
    }
}
