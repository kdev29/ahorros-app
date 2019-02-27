using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using GastosTracker.Web;
using GastosTracker.Web.Controllers;
using GastosTracker.Web.Controllers.api;
using System.Web.Http;
using GastosTracker.Web.Models;

namespace GastosTracker.Web.Tests.Controllers
{
    [TestClass]
    public class HomeControllerTest
    {
      
        [TestMethod]
        public void SaveTest()
        {
            // Arrange
            var path = @"C:\Users\leoc_\source\repos\GastosTracker.Web\GastosTracker.Web\App_Data\movimientos.json";
            MovimientosController controller = new MovimientosController(path);

            // Act
            var result = controller.Save(new Models.Movimiento() { cuenta = "1", fecha = "20180101", monto = 3500, tipo = "1" }) as IHttpActionResult;

            var service = new MovimientosService(path);
            var movements = service.GetAll();

            // Assert
            Assert.IsTrue(movements.Count > 0);
        }

        [TestMethod]
        public void EditTest()
        {
            var path = @"C:\Users\leoc_\source\repos\GastosTracker.Web\GastosTracker.Web\App_Data\movimientos.json";
            EditController editController = new EditController(path);
            var service = new MovimientosService(path);

            var movimiento = new Movimiento() { idMovimiento = 1, monto = 1200, fecha = "20181212" };

            editController.Post(movimiento);
            var editado = service.GetAll().Where(m => m.idMovimiento == movimiento.idMovimiento).First();

            Assert.IsTrue(editado.fecha == movimiento.fecha && editado.monto == movimiento.monto && editado.idMovimiento == movimiento.idMovimiento);
        }

    }
}
