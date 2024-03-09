using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace API.Extensions;

public static class IdentitiyServiceExtensions
{
    public static IServiceCollection AddIdentitiyServices(this IServiceCollection services,
        IConfiguration config)
    {
        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddJwtBearer(options => {
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true, // specify that we want the token to be validated against the encryption
                IssuerSigningKey = new SymmetricSecurityKey(Encoding
                    .UTF8.GetBytes(config["TokenKey"])),
                    ValidateIssuer = false, // we did not add this info to the token itself so it is not available for validation
                    ValidateAudience = false // "
            };
        });

        return services;
    }

}