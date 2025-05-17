using OtpNet;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

// Generate TOTP secret and current code
app.MapGet("/generate-totp", () =>
{
    var secretKey = KeyGeneration.GenerateRandomKey(20);
    var base32Secret = Base32Encoding.ToString(secretKey);

    var totp = new Totp(secretKey);
    var code = totp.ComputeTotp();

    return Results.Ok(new
    {
        Secret = base32Secret,
        CurrentCode = code
    });
});

// Verify a TOTP code with secret key
app.MapPost("/verify-totp", (VerifyTotpRequest request) =>
{
    var secretKeyBytes = Base32Encoding.ToBytes(request.Secret);
    var totp = new Totp(secretKeyBytes);

    bool isValid = totp.VerifyTotp(request.Code, out long timeStepMatched, new VerificationWindow(previous: 1, future: 1));

    return Results.Ok(new
    {
        IsValid = isValid
    });
});

app.Run();

record VerifyTotpRequest(string Secret, string Code);
