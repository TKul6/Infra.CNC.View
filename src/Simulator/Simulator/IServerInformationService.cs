using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WampSharp.V2.Rpc;

namespace Simulator
{
    public interface IServerInformationService
    {
        [WampProcedure("infra.cnc.serverName")]
        string GetServerName();
    }

    class ServerInformationService : IServerInformationService
    {
        public string GetServerName()
        {
            return "Test Server Name";
        }
    }
}
