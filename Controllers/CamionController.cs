using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LogisticaAngular.Models;

namespace LogisticaAngular.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CamionController : ControllerBase
    {
        private readonly LogisticaDbContext _context;

        public CamionController(LogisticaDbContext context)
        {
            _context = context;
        }

        // GET: api/Camion
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Camion>>> Getcamiones()
        {
            return await _context.camiones.ToListAsync();
        }

        [HttpGet("marca/{marca}")]

        public int GetCamionMarca(string marca)
        {
            int contador = 0;
            List<Camion> listado = (from p in _context.camiones where p.Marca == marca select p).ToList();

          
            int v = listado.Count();
            contador = v;
            System.Console.WriteLine("Hay {0} camiones de la marca {1}", v, marca);
            return contador;


        }

         [HttpGet("marca/{marca}/traccion{traccion}")]
         public List<Camion> GetCamionesPorMarcaTraccion(string marca, string traccion)
        {
            List<Camion> listado = (from c in _context.camiones where c.Marca == marca && c.Traccion == traccion select c).ToList();

            return listado;

        }
        



        [HttpGet("traccionSimple")]
         public List<Camion> GetCamionesTraccionS(string marca, string traccion)
        {
            List<Camion> listado = (from c in _context.camiones where c.Traccion == "Simple" select c).ToList();

            return listado;

        }
          [HttpGet("traccionDoble")]
         public List<Camion> GetCamionesTraccionD(string marca, string traccion)
        {
            List<Camion> listado = (from c in _context.camiones where c.Traccion == "Doble" select c).ToList();

            return listado;

        }


         [HttpGet("{marca}")]
         public List<Camion> GetCamionesPorMarca(string marca)
        {
            List<Camion> listado = (from c in _context.camiones where c.Marca == marca select c).ToList();

            return listado;

        }

        [HttpGet("busca/{id}")]
        public Camion GetProductoById(int id)
        {
            var camion = _context.camiones.Where(x=> x.Id == id).FirstOrDefault();
            return camion;
        }

        // GET: api/Camion/5
        // [HttpGet("{id}")]
        // public async Task<ActionResult<Camion>> GetCamion(int id)
        // {
        //     var camion = await _context.camiones.FindAsync(id);

        //     if (camion == null)
        //     {
        //         return NotFound();
        //     }

        //     return camion;
        // }

        // PUT: api/Camion/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCamion(int id, Camion camion)
        {
            if (id != camion.Id)
            {
                return BadRequest();
            }

            _context.Entry(camion).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CamionExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Camion
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Camion>> PostCamion(Camion camion)
        {
            _context.camiones.Add(camion);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCamion", new { id = camion.Id }, camion);
        }

        // DELETE: api/Camion/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Camion>> DeleteCamion(int id)
        {
            var camion = await _context.camiones.FindAsync(id);
            if (camion == null)
            {
                return NotFound();
            }

            _context.camiones.Remove(camion);
            await _context.SaveChangesAsync();

            return camion;
        }

        private bool CamionExists(int id)
        {
            return _context.camiones.Any(e => e.Id == id);
        }
    }
}
