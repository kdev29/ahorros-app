using AhorrosApp.Libs.Contracts;
using AhorrosApp.Libs.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace AhorrosApp.Libs.Mapper
{
    public interface IMapper
    {
        MovimientosResponse ToMovimientoContract(MovimientoDB movimiento);
        IEnumerable<MovimientosResponse> ToMovimientosContract(IEnumerable<MovimientoDB> items);
        MovimientoDB ToMovimientoDBModel(MovimientosRequest request);
    }
}
