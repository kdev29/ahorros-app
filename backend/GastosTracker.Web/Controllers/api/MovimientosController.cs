using GastosTracker.Web.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;

namespace GastosTracker.Web.Controllers.api
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class MovimientosController : ApiController
    {
        private string jsonPath;

        public MovimientosController()
        {
            jsonPath = HttpContext.Current.Server.MapPath(@"~\App_Data\movimientos.json");
        }

        public MovimientosController(string path)
        {
            jsonPath = path;
        }

        [HttpGet]
        public IHttpActionResult Get()
        {


            MovimientosService svc = new MovimientosService(jsonPath);

            List<Movimiento> movimientos = svc.GetAll();

            return Ok(movimientos);

        }

        [HttpGet]
        public IHttpActionResult GetById(int id)
        {
            MovimientosService svc = new MovimientosService(jsonPath);

            var movement = svc.FindById(id);

            return Ok(movement);

        }

        [HttpPost]
        public IHttpActionResult Save(Movimiento movimiento)
        {
            try
            {
                //string path = HttpContext.Current.Server.MapPath(@"~\App_Data\movimientos.json");
                MovimientosService svc = new MovimientosService(jsonPath);

                //var json = ConsultaJson();

                //List<Movimiento> movimientos = JsonConvert.DeserializeObject<List<Movimiento>>(json);
                List<Movimiento> movimientos = svc.GetAll();

                if (movimientos.Count > 0)
                    movimiento.idMovimiento = movimientos.OrderByDescending(m => m.idMovimiento).First().idMovimiento + 1;
                else
                    movimiento.idMovimiento = 1;

                movimientos.Add(movimiento);
                var newJson = JsonConvert.SerializeObject(movimientos);
                //string path = HttpContext.Current.Server.MapPath(@"~\App_Data\movimientos.json");
                using (var writer = new StreamWriter(@jsonPath))
                {
                    writer.Write(newJson);
                }

                return Ok(new { response = "saved", id = movimiento.idMovimiento });
            }
            catch (Exception e)
            {
                return Ok(new { response = "Fail", message = e.Message, stack = e.StackTrace, id = -1 });                
            }
        }

        private string ConsultaJson()
        {
            string path = HttpContext.Current.Server.MapPath(@"~\App_Data\movimientos.json");
            using (var reader = new StreamReader(@path))
            {
                var contenido = reader.ReadToEnd();

                return contenido;
            }
        }

    }
}
