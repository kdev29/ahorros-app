using AhorrosApp.Libs.Contracts;
using AhorrosApp.Libs.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace AhorrosApp.Libs.Mapper
{
    public class Mapper: IMapper
    {
        public IEnumerable<MovimientosResponse> ToMovimientosContract(IEnumerable<MovimientoDB> items)
        {
            return items.Select(ToMovimientoContract);
        }

        public MovimientosResponse ToMovimientoContract(MovimientoDB movimiento)
        {
            return new MovimientosResponse()
            {
                Comentario = movimiento.COMENTARIO,
                Cuenta = movimiento.CUENTA,
                Fecha = movimiento.FECHA,
                Monto = movimiento.MONTO,
                MovimientoID = movimiento.MOVIMIENTOID,
                TipoMovimiento = movimiento.TIPOMOVIMIENTO
            };
        }

        public MovimientoDB ToMovimientoDBModel(MovimientosRequest request)
        {
            return new MovimientoDB()
            {
                COMENTARIO = request.Comentario,
                CUENTA = request.Cuenta,
                FECHA = request.Fecha,
                MONTO = request.Monto,
                MOVIMIENTOID = request.MovimientoID,
                TIPOMOVIMIENTO = request.TipoMovimiento
            };

        }
    }
}
