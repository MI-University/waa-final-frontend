// import { CheckAlert } from "@components/ui/icons";
import Button from "./Button";

export default function ConfirmModal({
  title,
  description,
  action,
}) {
  return (
    <div className="text-center confirm-modal">
      <div className="px-12 my-4">
        <div className="text-center flex justify-center mb-4">
          {/* <CheckAlert height={80} /> */}
        </div>
        <div className="text-center mb-6">
          <h2 className="text-xl mt-4 mb-2 font-bold text-center">
            {title || "Confirmed!"}{" "}
          </h2>
          <p className="mb-4 text-gray-500">
            {description || "Your action has confirmed successfully"}
          </p>
        </div>
      </div>
      <Button
        className="w-60 mb-6"
        onClick={() => {
          action?.();
        }}
      >
        Continue
      </Button>
    </div>
  );
}
