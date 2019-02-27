using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace GastosTracker.Web.Models
{
    public class MovimientosService
    {
        public string JSONPath { get; set; }

        public MovimientosService(string jsonPath)
        {
            JSONPath = jsonPath;
        }

        public List<Movimiento> GetAll()
        {
            var json = ConsultaJson();

            List<Movimiento> movimientos = JsonConvert.DeserializeObject<List<Movimiento>>(json);
           
            return movimientos;
        }

        public Movimiento FindById(int id)
        {
            var allMovements = GetAll();

            return allMovements.FirstOrDefault(m => m.idMovimiento == id);
        }

        public void SaveAll(List<Movimiento> movimientos)
        {
            var newJson = JsonConvert.SerializeObject(movimientos);
            
            using (var writer = new StreamWriter(JSONPath))
            {
                writer.Write(newJson);
            }
        }

        private string ConsultaJson()
        {            
            using (var reader = new StreamReader(JSONPath))
            {
                var contenido = reader.ReadToEnd();

                return contenido;
            }
        }

    }
}