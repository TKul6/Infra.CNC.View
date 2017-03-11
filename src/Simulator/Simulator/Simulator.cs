using System;

namespace Simulator
{
    public class Simulator
    {


        #region Data Members
        private NamedSimulatorValue _serverStatus;

        private NamedSimulatorValue _inputPortEventsFiltered;

        private NamedSimulatorValue _inputPortEventsProcessed;

        private NamedSimulatorValue _inputPortEventsPublished;

        private NamedSimulatorValue _logicEventsFiltered;

        private NamedSimulatorValue _logicEventsProcessed;

        private NamedSimulatorValue _logicEventsPublished;

        private ISimulatorValue[] _inputPortParams;

        private NamedSimulatorValue _inputPort;

        private ISimulatorValue[] _logicParams;

        private NamedSimulatorValue _logic;

        private NamedSimulatorValue _components;

        private NamedSimulatorValue _root;

        private Random _random;
        #endregion
        
        #region Constructor
        public Simulator()
        {
            _serverStatus = new NamedSimulatorValue("Status", "Started");

            _inputPortEventsFiltered = new NamedSimulatorValue("EventsFiltered", 8);

            _inputPortEventsProcessed = new NamedSimulatorValue("EventsProccessed", 9);

            _inputPortEventsPublished = new NamedSimulatorValue("EventsPublished", 9);

            _logicEventsFiltered = new NamedSimulatorValue("EventsFiltered", 4);

            _logicEventsProcessed = new NamedSimulatorValue("EventsProccessed", 5);

            _logicEventsPublished = new NamedSimulatorValue("EventsPublished", 5);

            _inputPortParams = new ISimulatorValue[] { _inputPortEventsFiltered, _inputPortEventsProcessed, _inputPortEventsPublished };

            _inputPort = new NamedSimulatorValue("inputPort", _inputPortParams);

            _logicParams = new ISimulatorValue[] { _logicEventsFiltered, _logicEventsProcessed, _logicEventsPublished };

            _logic = new NamedSimulatorValue("logic", _logicParams);

            _components = new NamedSimulatorValue("Components", new ISimulatorValue[] { _inputPort, _logic });

            _root = new NamedSimulatorValue("root", new ISimulatorValue[] { _serverStatus, _components });

            _random = new Random();
        } 
        #endregion

        public NamedSimulatorValue Root
        {
            get { return _root; }
        }

        public void GenerateValues()
        {
            _inputPortEventsFiltered.Value = (int)_inputPortEventsFiltered.Value + _random.Next(1, 10);

            _inputPortEventsPublished.Value = _inputPortEventsProcessed.Value;

            _inputPortEventsProcessed.Value = (int)_inputPortEventsProcessed.Value +  _random.Next(1, 10);


            _logicEventsFiltered.Value = (int)_inputPortEventsPublished.Value - 10 + _random.Next(1, 10);

            _logicEventsPublished.Value = _inputPortEventsProcessed.Value;

            _logicEventsProcessed.Value = (int) _inputPortEventsPublished.Value - (int) _logicEventsFiltered.Value;


        }
    }
}