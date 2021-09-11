using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LogisticaAngular.Models;
using Microsoft.AspNetCore.Authorization; 

namespace LogisticaAngular.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CamioneroController : ControllerBase
    {
        private readonly LogisticaDbContext _context;

        public CamioneroController(LogisticaDbContext context)
        {
            _context = context;
        }

        // GET: api/Camionero
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<Camionero>>> Getcamioneros()
        {
            return await _context.camioneros.ToListAsync();

        }
        
              

        [HttpGet("Salario")]
        [Authorize]
        public List<Camionero>  GetcamionerosSalario()
        {
            List<Camionero> lista = new List<Camionero>();
            

            double mayor = 0;
            Camionero CamioneroSalario = new Camionero();
            foreach (Camionero camionero in _context.camioneros.ToList())
            {
                if (camionero.Salario > mayor)
                {
                    mayor = camionero.Salario;
                    CamioneroSalario = camionero;
                }
            }
            lista.Add(CamioneroSalario);
            return lista;
            //return CamioneroSalario;
        }


        // [HttpGet("Salario2")]
        // public List<Camionero> GetcamionerosSalario2()
        // {
        //     var SalarioMayor = _context.camioneros.MaxBy (x=> x.Salario).ToList();
        //     return SalarioMayor;

            
        // }
       
        


        [HttpGet("SalarioPromedio")]
        [Authorize]
        public double GetcamionerosSalarioPromedio()
        {

            double Promedio = 0, SumaSalario=0;
            
            Camionero CamioneroSalario = new Camionero();
            foreach (Camionero camionero in _context.camioneros.ToList())
            {
                SumaSalario+=camionero.Salario;
            }
            Promedio=SumaSalario/_context.camioneros.Count();
            return Promedio;
        }




        // [HttpGet("idCamion")]
        // public List<Camionero> GetcamioneroCamion(int idcamion)
        // {
        //     List<Camionero> listado = (from t1 in _context.camioneros join t2 in _context.CamionCamioneros on t1.Id equals t2.CamioneroId where t2.CamionId == idcamion select t1 /*new { t1.Id, t1.Nombre, t1.Apellido, t2.CamionId }*/).ToList();

        //    /* foreach (var item in listado)
        //     {
                
        //         System.Console.WriteLine("{0}{1}{2}{3}",item.Id,item.Nombre,item.Apellido,item.CamionId);
                

        //     }*/
        //     return listado;


        // }
        
        [HttpGet("busca/{id}")]
        public Camionero GetProductoById(int id)
        {
            var camionero = _context.camioneros.Where(x=> x.Id == id).FirstOrDefault();
            return camionero;
        }

        [HttpGet("nombre/{nombre}/apellido/{apellido}")]
         public List<Camionero> Busqueda(string nombre, string apellido)
        {
            
             List<Camionero> listado = (from c in _context.camioneros where c.Nombre == nombre || c.Apellido == apellido select c).ToList();

            return listado;

        }

        
        




        // GET: api/Camionero/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Camionero>> GetCamionero(int id)
        {
            var camionero = await _context.camioneros.FindAsync(id);

            if (camionero == null)
            {
                return NotFound();
            }

            return camionero;
        }

        // PUT: api/Camionero/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCamionero(int id, Camionero camionero)
        {
            if (id != camionero.Id)
            {
                return BadRequest();
            }

            _context.Entry(camionero).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CamioneroExists(id))
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

        // POST: api/Camionero
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Camionero>> PostCamionero(Camionero camionero)
        {

            _context.camioneros.Add(camionero);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCamionero", new { id = camionero.Id }, camionero);
        }

        // DELETE: api/Camionero/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Camionero>> DeleteCamionero(int id)
        {
            var camionero = await _context.camioneros.FindAsync(id);
            if (camionero == null)
            {
                return NotFound();
            }

            _context.camioneros.Remove(camionero);
            await _context.SaveChangesAsync();

            return camionero;
        }

        private bool CamioneroExists(int id)
        {
            return _context.camioneros.Any(e => e.Id == id);
        }
    }
}
