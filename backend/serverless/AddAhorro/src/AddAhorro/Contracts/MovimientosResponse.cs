using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AhorrosApp.Libs.Contracts
{
    public class MovimientosResponse
    {
        public string Cuenta { get; set; }
        public int MovimientoID { get; set; }
        public string Comentario { get; set; }
        public string Fecha { get; set; }
        public decimal Monto { get; set; }
        public string TipoMovimiento { get; set; }
    }
}
