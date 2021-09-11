using Microsoft.EntityFrameworkCore.Migrations;

namespace LogisticaAngular.Migrations
{
    public partial class AgregoAutenticacion : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "camioneros",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nombre = table.Column<string>(nullable: true),
                    Apellido = table.Column<string>(nullable: true),
                    Domicilio = table.Column<string>(nullable: true),
                    Telefono = table.Column<int>(nullable: false),
                    Salario = table.Column<double>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_camioneros", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "camiones",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Marca = table.Column<string>(nullable: true),
                    Modelo = table.Column<string>(nullable: true),
                    Transmision = table.Column<string>(nullable: true),
                    Traccion = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_camiones", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Provincias",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nombre = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Provincias", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Usuarios",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserName = table.Column<string>(nullable: true),
                    FullName = table.Column<string>(nullable: true),
                    PassWord = table.Column<string>(nullable: true),
                    UserRole = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Usuarios", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CamionCamioneros",
                columns: table => new
                {
                    CamionId = table.Column<int>(nullable: false),
                    CamioneroId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CamionCamioneros", x => new { x.CamionId, x.CamioneroId });
                    table.ForeignKey(
                        name: "FK_CamionCamioneros_camiones_CamionId",
                        column: x => x.CamionId,
                        principalTable: "camiones",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CamionCamioneros_camioneros_CamioneroId",
                        column: x => x.CamioneroId,
                        principalTable: "camioneros",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Paquetes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Descripcion = table.Column<string>(nullable: true),
                    Destinatario = table.Column<string>(nullable: true),
                    DireccionDestinatario = table.Column<string>(nullable: true),
                    Entregado = table.Column<bool>(nullable: false),
                    CamioneroId = table.Column<int>(nullable: true),
                    ProvinciaId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Paquetes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Paquetes_camioneros_CamioneroId",
                        column: x => x.CamioneroId,
                        principalTable: "camioneros",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Paquetes_Provincias_ProvinciaId",
                        column: x => x.ProvinciaId,
                        principalTable: "Provincias",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CamionCamioneros_CamioneroId",
                table: "CamionCamioneros",
                column: "CamioneroId");

            migrationBuilder.CreateIndex(
                name: "IX_Paquetes_CamioneroId",
                table: "Paquetes",
                column: "CamioneroId");

            migrationBuilder.CreateIndex(
                name: "IX_Paquetes_ProvinciaId",
                table: "Paquetes",
                column: "ProvinciaId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CamionCamioneros");

            migrationBuilder.DropTable(
                name: "Paquetes");

            migrationBuilder.DropTable(
                name: "Usuarios");

            migrationBuilder.DropTable(
                name: "camiones");

            migrationBuilder.DropTable(
                name: "camioneros");

            migrationBuilder.DropTable(
                name: "Provincias");
        }
    }
}
