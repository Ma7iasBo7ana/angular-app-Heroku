using System;
using LogisticaAngular.Models;
using System.Text;
using System.Threading.Tasks;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
namespace LogisticaAngular.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoginController:ControllerBase
    {
        private readonly IConfiguration _config;
        public LoginController (IConfiguration config){
            _config=config;
        }
        // private readonly LogisticaDbContext _context;
        // public LoginController(LogisticaDbContext context)
        // {
        //     _context = context;
        // }

        [HttpPost]
        [AllowAnonymous]
        public IActionResult Login ([FromBody] User login){
            IActionResult response=Unauthorized();
            User user=Autenticar(login);
            if(user!=null){
                var tokenString=GenerarToken(user);
                response=Ok(new {token=tokenString,
                 userDetailts=user,});
            }

            return response;
        }

        private User Autenticar (User credenciales){
            //validar en BD
            // User usuarioValidado=_context.Usuarios.Where(x=> x.UserName==credenciales.Username) && (x.Password==credenciales.Password).FirstOrDefault();
            var usuarioValidado= new User(){
                FullName="Juan Perez",
                UserRole="Admin",
                UserName="Juan2103"

            };
            return usuarioValidado;
            

        }

        private string GenerarToken (User infousuario){
            var securityKey= new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:SecretKey"]));
            var credentials= new SigningCredentials(securityKey,SecurityAlgorithms.HmacSha256);
            var claims=new []{
                new Claim(JwtRegisteredClaimNames.Sub,infousuario.UserName),
                new Claim("fullName", infousuario.FullName.ToString()),
                new Claim("role", infousuario.UserRole),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };
            var token= new JwtSecurityToken(
                issuer:_config ["Jwt:Issuer"],
                audience:_config["Jwt:Audience"],
                claims:claims,
                expires:DateTime.Now.AddMinutes(30),
                signingCredentials:credentials
            );
            
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

    }
}