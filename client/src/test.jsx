import { useStore } from "@/api/store";
import { Button } from "@/components/ui/button";
export const Test = () => {
  const { updateConfig } = useStore((store) => store.stateActions);
  const { connected, ham } = useStore((store) => ({
    connected: store.connected,
    ham: store.ham,
  }));
  const { toggleConnected, trulyConnected } = useStore(
    (store) => store.stateActions,
  );
  const { path, baudRate, dataBits } = useStore((store) => store.config);
  const serialOutput = useStore((store) => store.serialOutput);
  console.log("rerendered");
  return (
    <div>
      <button
        onClick={() => {
          updateConfig({ path: "COM15", baudRate: "9500" });
        }}
      >
        update path^baudrate
      </button>
      <button onClick={toggleConnected}>
        toggle connected: now {connected ? "connected" : "disconnected"}
      </button>
      <br />
      <Button onClick={trulyConnected}>
        {connected ? "connected" : "disconnected"}
      </Button>
      <br />
      <p>path: {path}</p>
      <p>baudRate: {baudRate}</p>
      <p>dataBits: {dataBits}</p>
      <p>serialOutput: {JSON.stringify(serialOutput, null, 2)}</p>
      <p>ham:{ham}</p>
    </div>
  );
};
