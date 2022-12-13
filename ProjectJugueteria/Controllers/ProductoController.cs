using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectJugueteria.DataAccess.Interfaces;
using ProjectJugueteria.Models;
using System.ComponentModel;

namespace ProjectJugueteria.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductoController : ControllerBase
    {
        private readonly IRepositoryAsync<Producto> _repository;

        public ProductoController(IRepositoryAsync<Producto> repository)
        {
            _repository = repository;
        }

        [HttpGet]
        [Route("GetProducts")]
        public async Task<IActionResult> Get()
        {
            var listaProducto = await _repository.GetAll();
            return StatusCode(StatusCodes.Status200OK, listaProducto);
        }

        [HttpGet]
        [Route("createBase")]
        public IActionResult CreateBase()
        {
            _repository.CreateBase();
            return StatusCode(StatusCodes.Status200OK, "OK");

        }

        [HttpPost]
        [Route("AddProducts")]
        public async Task<IActionResult> Add([FromBody] Producto producto)
        {
            if (!ModelState.IsValid)
            {
                return StatusCode(StatusCodes.Status204NoContent, "error");
            }
            await _repository.Insert(producto);
            return StatusCode(StatusCodes.Status200OK, "OK");
        }


        [HttpPut]
        [Route("UpdateProducts")]
        public async Task<IActionResult> Update([FromBody] Producto producto)
        {
             await _repository.Update(producto);
            return StatusCode(StatusCodes.Status200OK, "OK");
        }

        [HttpDelete]
        [Route("DeleteProducts/{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _repository.Delete(id);
            return StatusCode(StatusCodes.Status200OK, "OK");
        }

        private async Task<bool> ProductoExists(int id)
        {
            var entity = await _repository.GetByID(id);
            return (entity is null);

        }


    }
}
