using System;
using System.Collections.Generic;

namespace Simulator
{


    public interface ISimulatorValue
    {
        string Name { get; }

        object Value { get; }
    }

    public class NamedSimulatorValue : ISimulatorValue
    {
        public string Name { get; set; }

        public object Value { get; set; }

        public NamedSimulatorValue(string name, object value)
        {
            Name = name;

            Value = value;
        }

    }

}

