using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GastosTracker.Web.Models
{
    public class Movimiento
    {
        public double monto { get; set; }
        public string cuenta { get; set; }
        public string tipo { get; set; }
        public string fecha { get; set; }
        public int idMovimiento { get; set; }
        public string comentario { get; set; }

        public Movimiento()
        {
            fecha = DateTime.Now.ToString("yyyyMMdd");
            comentario = string.Empty;
        }
    }

    public enum Cuentas
    {

    }

    public enum TipoMovimiento
    {

    }
}