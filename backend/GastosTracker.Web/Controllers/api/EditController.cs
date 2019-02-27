using GastosTracker.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;

namespace GastosTracker.Web.Controllers.api
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class EditController : ApiController
    {
        private string jsonPath;

        public EditController()
        {
            jsonPath = HttpContext.Current.Server.MapPath(@"~\App_Data\movimientos.json");
        }

        public EditController(string path)
        {
            jsonPath = path;
        }

        // GET api/<controller>
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<controller>/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<controller>
        public IHttpActionResult Post(Movimiento movimiento)
        {
            var service = new MovimientosService(jsonPath);
            var movimientos = service.GetAll();            

            var movimientoEditado = movimientos.Where(m => m.idMovimiento == movimiento.idMovimiento).First();

            movimientoEditado.fecha = movimiento.fecha;
            movimientoEditado.monto = movimiento.monto;
            movimientoEditado.comentario = movimiento.comentario;

            service.SaveAll(movimientos);

            return Ok();
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}