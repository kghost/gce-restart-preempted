const Compute = require('@google-cloud/compute');

exports.RestartPreempted = async (event) => {
  var o = JSON.parse(Buffer.from(event.data, 'base64').toString());
  console.log(`JSON: ${typeof o}:${o}!`);
  var payload = o.jsonPayload;
  if (payload.event_type == 'GCE_OPERATION_DONE' && payload.event_subtype == 'compute.instances.preempted') {
    const compute = new Compute();
    console.log(`Starting: ${payload.resource.zone}:${payload.resource.name}!`);
    const zone = compute.zone(payload.resource.zone);
    const vm = zone.vm(payload.resource.name);
    const result = await vm.start();
    console.log(`Start: ${JSON.stringify(result)}!`);
  } else {
    console.log(`Unknown: ${JSON.stringify(o)}!`);
  }
};
