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



var serverStatus = new NamedSimulatorValue("Status","Started");

var inputPortEventsFiltered = new NamedSimulatorValue("EventsFilted",0);

var inputPortEventsProcessed = new NamedSimulatorValue("EventsProccessed",0);

var inputPortEventsPublished = new NamedSimulatorValue("EventsPublished",0);

var logicEventsFiltered = new NamedSimulatorValue("EventsFilted",0);

var logicEventsProcessed = new NamedSimulatorValue("EventsProccessed",0);

var logicEventsPublished = new NamedSimulatorValue("EventsPublished",0);

var inputPortParams = new ISimulatorValue[]{inputPortEventsFiltered,inputPortEventsProcessed,inputPortEventsPublished};

var inputPort = new NamedSimulatorValue("inputPort", inputPortParams);

var logicParams = new ISimulatorValue[]{logicEventsFiltered,logicEventsProcessed,logicEventsPublished};

var logic = new NamedSimulatorValue("logic", logicParams);

var components = new NamedSimulatorValue("Components", new ISimulatorValue[] {inputPort,logic});

var root = new NamedSimulatorValue("root",new ISimulatorValue[] {serverStatus,components});


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
                    subject.OnNext(root);

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
