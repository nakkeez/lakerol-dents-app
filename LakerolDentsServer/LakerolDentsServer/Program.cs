using LakerolDentsServer;
using LakerolDentsServer.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container

const string frontendOrigins = "_frontendOrigins";

builder.Services.AddCors(options =>
{
    options.AddPolicy(
        name: frontendOrigins,
        policy  =>
        {
            policy
            .WithOrigins("http://localhost:3000", "https://lakerol-dents-app.vercel.app")
            .AllowAnyMethod()
            .AllowAnyHeader();
        }
    );
});

 var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ??
     throw new InvalidOperationException("Connection string 'DefaultConnection'" +
    " not found.");

builder.Services.AddDbContext<LakerolDentsDbContext>(options =>
{
    options.UseSqlServer(connectionString, opts => opts.EnableRetryOnFailure());
});

builder.Services.AddAuthorization();
builder.Services.AddIdentityApiEndpoints<User>()
    .AddEntityFrameworkStores<LakerolDentsDbContext>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Structure returned error messages
builder.Services.AddProblemDetails();

var app = builder.Build();

// Migrate and seed the database
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    DatabaseData.MigrateAndSeed(services);
}

app.MapIdentityApi<User>();

app.MapPost("/logout", async (SignInManager<User> signInManager) =>
{
    await signInManager.SignOutAsync();
    return Results.Ok();
}).RequireAuthorization();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(frontendOrigins);

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
