using Dal.Data;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Interfaces;

public interface IDal
{
    ApplicationDbContext Context { get; }
    ICategoryService CategoryService { get; }

}
