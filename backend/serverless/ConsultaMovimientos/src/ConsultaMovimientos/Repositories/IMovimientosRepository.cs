using AhorrosApp.Libs.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AhorrosApp.Libs.Repositories
{
    public interface IMovimientosRepository
    {
        Task<IEnumerable<MovimientoDB>> GetAll();
        Task<MovimientoDB> GetMovimientoDB(string cuenta, int movimiento);
        Task AddMovieDB(MovimientoDB movimiento);
    }
}
