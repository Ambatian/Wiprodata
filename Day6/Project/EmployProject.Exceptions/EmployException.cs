using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace EmployProject.Exceptions
{
    public class EmployException : ApplicationException
    {
        public EmployException() { }

        public EmployException(string message) : base(message) { }
    }
}
