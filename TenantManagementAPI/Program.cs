using Microsoft.EntityFrameworkCore;
using TenantManagementAPI.Data;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:3000") // Allow requests from React app
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
}); builder.Services.AddControllers();
// Add DbContext
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();
// Use CORS policy
app.UseCors("AllowReactApp");
// Middleware and other configurations
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();