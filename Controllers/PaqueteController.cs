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
    public class PaqueteController : ControllerBase
    {
        private readonly LogisticaDbContext _context;

        public PaqueteController(LogisticaDbContext context)
        {
            _context = context;
        }

        // GET: api/Paquete
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Paquete>>> GetPaquetes()
        {
            return await _context.Paquetes.Include(p=> p.Camionero).Include(p=>p.Provincia).ToListAsync();
        }
        [HttpGet("camionero/{idcamionero}/provincia/{idprovincia}")]
        public List<Paquete> GetEnviosPorCamioneroProvincia(int idcamionero, int idprovincia)
        {
            List<Paquete> listado = (from p in _context.Paquetes where p.Provincia.Id == idprovincia && p.Camionero.Id == idcamionero select p).ToList();

            return listado;

        }

        [HttpGet("provincia/{idprovincia}")]
        public List<Paquete> GetEnviosPorProvincia(int idprovincia)
        {
            List<Paquete> listado = (from p in _context.Paquetes where p.Provincia.Id == idprovincia select p).ToList();

            return listado;

        }
     


        [HttpGet("Entregado")]

        public List<Paquete> GetPaquetesEntregados()
        {
            List<Paquete> listado = (from p in _context.Paquetes where p.Entregado == true select p).Include(p=> p.Camionero).Include(p=>p.Provincia).ToList();

            return listado;

        }

        [HttpGet("NoEntregado")]

        public List<Paquete> GetPaquetesNoEntregados()
        {
            List<Paquete> listado = (from p in _context.Paquetes where p.Entregado == false select p).Include(p=> p.Camionero).Include(p=>p.Provincia).ToList();

            return listado;

        }

        [HttpGet("NoEntregado/{idcamionero}")]

        public List<Paquete> GetPaquetesNoEntregadosPorCamionero(int idcamionero)
        {
            List<Paquete> listado = (from p in _context.Paquetes where p.Camionero.Id == idcamionero && p.Entregado == false select p).ToList();

            return listado;

        }
        [HttpGet("Buscar/{provincia}")]

        public List<Paquete> GetPaquete(string provincia)
        {
           
            
                List<Paquete> listado = (from p in _context.Paquetes where p.Provincia.Nombre == provincia select p).Include(p=> p.Camionero).Include(p=>p.Provincia).ToList();

            return listado;
            
            

        }

        // GET: api/Paquete/5
        // [HttpGet("{id}")]
        // public async Task<ActionResult<Paquete>> GetPaquete(int id)
        // {


            
        //     var paquete = await _context.Paquetes.FindAsync(id);

        //     if (paquete == null)
        //     {
        //         return NotFound();
        //     }

        //     return paquete;
        
        // }

[HttpGet("{id}")]
        public Paquete GetProductoById(int id)
        {
            var prod = _context.Paquetes.Where(x=> x.Id == id).Include(p=> p.Camionero).Include(p=>p.Provincia).FirstOrDefault();
            return prod;
        }

        // PUT: api/Paquete/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPaquete(int id, Paquete paquete)
        {
            if (id != paquete.Id)
            {
                return BadRequest();
            }

            _context.Entry(paquete).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PaqueteExists(id))
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

        // POST: api/Paquete
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Paquete>> PostPaquete(Paquete paquete)
        {
            _context.Paquetes.Add(paquete);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPaquete", new { id = paquete.Id }, paquete);
        }

        // DELETE: api/Paquete/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Paquete>> DeletePaquete(int id)
        {
            var paquete = await _context.Paquetes.FindAsync(id);
            if (paquete == null)
            {
                return NotFound();
            }

            _context.Paquetes.Remove(paquete);
            await _context.SaveChangesAsync();

            return paquete;
        }

        private bool PaqueteExists(int id)
        {
            return _context.Paquetes.Any(e => e.Id == id);
        }
    }
}
