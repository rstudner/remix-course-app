import { FaExclamationCircle } from 'react-icons/fa';

function ValidationErrors({ validationErrors }) {
  return (
    <>
      {validationErrors && (
        <ul>
          {Object.values(validationErrors).map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
    </>
  );
}

export default ValidationErrors;
