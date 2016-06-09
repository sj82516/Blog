var expect = require('chai').expect;
var Flow = require('./Network.js').Flow;
var FlowNetwork = require('./Network.js').FlowNetwork;
var FordFulkerson = require('./Network.js').FordFulkerson;

describe('Maximun flow and Mincut problem',function(){
	var flowNetwork = new FlowNetwork(8);
	flowNetwork.addEdge(new Flow(0,1,10));
	flowNetwork.addEdge(new Flow(0,2,5));
	flowNetwork.addEdge(new Flow(0,3,15));
	flowNetwork.addEdge(new Flow(1,2,4));
	flowNetwork.addEdge(new Flow(2,3,4));
	flowNetwork.addEdge(new Flow(1,4,9));
	flowNetwork.addEdge(new Flow(1,5,15));
	flowNetwork.addEdge(new Flow(2,5,8));
	flowNetwork.addEdge(new Flow(3,6,16));
	flowNetwork.addEdge(new Flow(6,2,6));
	flowNetwork.addEdge(new Flow(4,5,15));
	flowNetwork.addEdge(new Flow(5,6,15));
	flowNetwork.addEdge(new Flow(4,7,10));
	flowNetwork.addEdge(new Flow(5,7,10));
	flowNetwork.addEdge(new Flow(6,7,10));
	var fordFulkerson = new FordFulkerson(flowNetwork, 0, 7);
	it('FordFulkerson algorithm',function(){
		expect(fordFulkerson.value).is.equal(28);
		expect(fordFulkerson.marked).is.eql([true,false,true,true,false,false,true,false]);
	})

})