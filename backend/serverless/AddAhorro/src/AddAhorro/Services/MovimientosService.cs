using AhorrosApp.Libs.Contracts;
using AhorrosApp.Libs.Mapper;
using AhorrosApp.Libs.Models;
using AhorrosApp.Libs.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AhorrosApp.NetCore.Api.Services
{
    public class MovimientosService: IMovimientosService
    {
        private readonly IMovimientosRepository _repo;
        private readonly IMapper _mapper;

        public MovimientosService(IMovimientosRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        public async Task AddMovimiento(MovimientosRequest request)
        {
            request.Fecha = DateTime.Now.ToString("yyyyMMdd");
             var movimiento = _mapper.ToMovimientoDBModel(request);

            await _repo.AddMovieDB(movimiento);

        }

        public async Task<IEnumerable<MovimientosResponse>> GetAllItems()
        {
            var response = await _repo.GetAll();

            return _mapper.ToMovimientosContract(response); ;
        }

        public async Task<MovimientosResponse> GetMovimiento(string cuenta, int movimiento)
        {
            var response = await _repo.GetMovimientoDB(cuenta, movimiento);

            return _mapper.ToMovimientoContract(response);
        }
    }
}
