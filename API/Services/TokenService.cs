using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
// using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using API.Entities;
using API.Interfaces;

namespace API.Services;

public class TokenService : ITokenService
{
    private readonly SymmetricSecurityKey _key;

    public TokenService(IConfiguration config)
    {
        _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));
    }

    public string CreateToken(AppUser user)
    {
        var claims = new List<Claim> // create collection of claims that we want to include in the token
        {
            new Claim(JwtRegisteredClaimNames.NameId, user.UserName)
        };

        var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512); // create the signing creds that is used to sign the token
                                                                                 // specify which argorithm to use to encrypt

        var tokenDescriptor = new SecurityTokenDescriptor // describe token (properties)
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.Now.AddDays(7),
            SigningCredentials = creds
        };

        var tokenHandler = new JwtSecurityTokenHandler(); // use the token-handler for token creation

        var token = tokenHandler.CreateToken(tokenDescriptor); 
        
        return tokenHandler.WriteToken(token);
    }
}