using AhorrosApp.Libs.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AhorrosApp.NetCore.Api.Services
{
    public interface IMovimientosService
    {
        Task<IEnumerable<MovimientosResponse>> GetAllItems();
        Task<MovimientosResponse> GetMovimiento(string cuenta, int movimientoId);
        Task AddMovimiento(MovimientosRequest request);
    }
}
