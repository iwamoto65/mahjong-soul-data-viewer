import { GameLatestCloseIcon as CloseIcon } from "./CloseIcon";
import { GameLatestLoadingIcon as LoadingIcon } from "./LoadingIcon";
import { GameLatestCheckMarkIcon as CheckMarkIcon } from "./CheckMarkIcon";
import { GameLatestCrossMarkIcon as CrossMarkIcon } from "./CrossMarkIcon";

const SHEET_BASE_URL = "https://docs.google.com/spreadsheets/d/";

interface ConfirmModalProps {
  modalState: "success" | "failure" | "loading";
  isModalOpen: boolean;
  closeModal: () => void;
  sheetId: string;
}

interface SuccessContentProps extends Pick<ConfirmModalProps, "closeModal" | "sheetId"> {}

const LoadingContent: React.FC = (): JSX.Element => {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <LoadingIcon />
        <h3 className="mt-5 text-lg font-normal text-gray-500 dark:text-gray-400">
          シートを作成中です
          <br />
          しばらくお待ちください
        </h3>
      </div>
    </>
  );
};

const SuccessContent: React.FC<SuccessContentProps> = ({ closeModal, sheetId }): JSX.Element => {
  return (
    <>
      <CheckMarkIcon />
      <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">シートの作成が完了しました</h3>
      <div className="relative w-full h-80">
        <iframe src={`${SHEET_BASE_URL + sheetId}/preview`} width="100%" height="100%" className="absolute inset-0" title="Spreadsheet Preview" />
      </div>
      <div className="mt-5">
        <a href={SHEET_BASE_URL + sheetId} target="_blank" rel="noopener noreferrer">
          <button
            onClick={closeModal}
            type="button"
            className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
          >
            シートを開く
          </button>
        </a>
      </div>
    </>
  );
};

const FailureContent: React.FC = (): JSX.Element => {
  return (
    <>
      <CrossMarkIcon />
      <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
        シートの作成に失敗しました
        <br />
        実行し直してください
      </h3>
    </>
  );
};

export const GameLatestConfirmModal: React.FC<ConfirmModalProps> = ({ modalState, isModalOpen, closeModal, sheetId }): JSX.Element => {
  return (
    <>
      {isModalOpen && (
        <div
          tabIndex={-1}
          className="fixed inset-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                onClick={closeModal}
                className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <CloseIcon />
              </button>
              <div className="p-4 md:p-5 text-center">
                {modalState === "loading" && <LoadingContent />}
                {modalState === "success" && <SuccessContent closeModal={closeModal} sheetId={sheetId} />}
                {modalState === "failure" && <FailureContent />}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
