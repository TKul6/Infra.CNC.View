using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using WampSharp.Binding;
using WampSharp.Fleck;
using WampSharp.Newtonsoft;
using WampSharp.V2;
using WampSharp.V2.Binding;
using WampSharp.V2.Client;
using WampSharp.V2.Realm;

namespace Simulator
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Infra.CNC.Simulator 1.0");

            const string location = "ws://127.0.0.1:4099/";

            var simulator = new Simulator();


            using (IWampHost host = new WampHost())
            {
                var jsonSerializer = JsonSerializer.Create();

                jsonSerializer.ContractResolver = new CamelCasePropertyNamesContractResolver();

                IWampBinding jsonBinding = new JTokenJsonBinding(jsonSerializer);
                
                host.RegisterTransport(new FleckWebSocketTransport(location), jsonBinding);

                IWampHostedRealm realm = host.RealmContainer.GetRealmByName("infra.cncService.simulator");

                // Host WAMP application components

                host.Open();

                Console.WriteLine("Server is running on " + location);

                realm.Services.RegisterCallee(new ServerInformationService()).Wait();

                Console.WriteLine("Registered server information service");

                Console.WriteLine("Press any key to send CNC data (x to exit)");



                var choise = Console.ReadKey().KeyChar;

                var subject = realm.Services.GetSubject<ISimulatorValue>("cncData");

                while (choise != 'x' && choise != 'X')
                {
                    simulator.GenerateValues();

                    subject.OnNext(simulator.Root);

                    Console.WriteLine("Data was sent!");

                    choise = Console.ReadKey().KeyChar;

                }

                Console.WriteLine(Environment.NewLine + "Goodbye");

                Console.ReadLine();
            }

        }

        internal class TreeNode
        {
            public string Name { get; set; }

            public TreeNode Children { get; set; }

            public object Value { get; set; }
        }
    }
}
