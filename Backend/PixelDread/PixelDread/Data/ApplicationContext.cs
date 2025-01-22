using System.Data.Entity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace PixelDread.Data
{
    public class ApplicationContext : IdentityDbContext<IdentityUser>
    {
    }
}
