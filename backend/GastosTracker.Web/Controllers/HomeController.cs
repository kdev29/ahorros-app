using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace GastosTracker.Web.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {            
            return File("index.html", "text/html");            
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public ActionResult Ahorros()
        {
            return View();
        }

        public ActionResult Movimiento(int id)
        {            

            ViewBag.Id = id;

            return View();
        }

        public ActionResult Totales()
        {


            return View();
        }
    }
}