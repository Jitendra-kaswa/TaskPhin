import React, { useState, useEffect, useRef } from 'react';
import {Status} from '../../enums/candidateStatus'
import { ApiRequest } from '../../apiService';
import { API_ENDPOINTS } from '../../apiEndpoints';
import Loader from '../Loader';

interface Errors {
    field: string,
    value: string
}

interface FormModelProps {
    closeModal: () => void,
    fetchAllCandidates: () => void,
    candidate: any
}

const FormModal: React.FC<FormModelProps> = ({ candidate, closeModal , fetchAllCandidates}) => {
    const initialCandidateData = useRef(candidate);
  const [formData, setFormData] = useState({
    name: candidate === undefined ? '' : candidate.name,
    email: candidate === undefined ? '' : candidate.email,
    skills: candidate === undefined ? '' : candidate.skills,
    phone: candidate === undefined ? '' : candidate.phone,
    expected_salary: candidate === undefined ? '' : candidate.expected_salary,
    node_experience: candidate === undefined ? '' : candidate.node_experience,
    react_experience: candidate === undefined ? '' : candidate.react_experience,
    status: candidate === undefined ? Object.values(Status)[0] : candidate.status
  });
  const [errors, setErrors] = useState<Map<string, string>>(new Map());
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<string | null>(null);

  const getChangedData = (formData: any) => {
    const changedData: any = {};
    for (const key in formData) {
      if (formData[key] !== initialCandidateData.current[key]) {
        changedData[key] = formData[key];
      }
    }
    return changedData;
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (alert !== null) {
      timer = setTimeout(() => {
        setAlert(null);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [alert]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newErrors = new Map(errors);
    switch (name) {
        case 'phone':
          if (!/^\d{10}$/.test(value)) {
            newErrors.set(name, 'Phone number must be 10 digits');
          } else {
            newErrors.delete(name);
          }
          break;
        case 'expected_salary':
          if (value && isNaN(Number(value))) {
            newErrors.set(name, 'Expected salary must be a number');
          } else {
            newErrors.delete(name);
          }
          break;
        case 'node_experience':
        case 'react_experience':
          if (isNaN(Number(value))) {
            newErrors.set(name, 'Experience must be a number');
          } else {
            newErrors.delete(name);
          }
          break;
        default:
          break;
      }
      setErrors(newErrors);
      setFormData(prevState => ({
        ...prevState,
        [name]: value,
      }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    if (errors.size > 0) {
        console.log('Form submission prevented due to errors:', errors);
        setLoading(false);
        return;
      }
      if(
        formData &&
        ( formData.expected_salary === '' ||
        formData.expected_salary <= 0) )
        delete formData.expected_salary
      try {
        candidate
        ? await ApiRequest.put(API_ENDPOINTS.UPDATE_CANDIDATE(candidate.id), getChangedData(formData))
        : await ApiRequest.post(API_ENDPOINTS.CREATE_CANDIDATE, formData)
        fetchAllCandidates()
        setLoading(false);
        closeModal();
      } catch (error: any) {
        setLoading(false);
        setAlert(error)
      }
    console.log(formData);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg w-1/3">
      <div className="relative">
        {loading && (
          <div className="flex items-center justify-center">
            <Loader />
          </div>
        )
        }
      </div>
      {alert && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-t-md fixed top-10 left-1/2 transform -translate-x-1/2 max-w-xs z-50">
          <p>{alert}</p>
        </div>
      )}
      {errors.size > 0 && (
          <div className="mb-4">
            <h3 className="font-semibold mb-2 text-red-600">Errors:</h3>
            <ul className="list-disc list-inside">
            {Array.from(errors.entries()).map(([key, error]) => (
                <li key={key} className="text-red-600">{error}</li>
            ))}
            </ul>
          </div>
        )}

        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-semibold">Candidate Details</h2>
          <button onClick={closeModal} className="text-gray-600 hover:text-gray-800 focus:outline-none">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="relative z-0 w-full mb-5 group">
            <input type="name" name="name" id="name"  value={formData.name} onChange={handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-1500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Full Name</label>
            </div>
          <div className="relative z-0 w-full mb-5 group">
            <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-1500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
            </div>
          <div className="relative z-0 w-full mb-5 group">
            <input type="phone" name="phone" id="phone" value={formData.phone} onChange={handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-1500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone</label>
            </div>
          <div className="relative z-0 w-full mb-5 group">
            <input type="expected_salary" name="expected_salary" id="expected_salary" value={formData.expected_salary} onChange={handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-1500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "/>
            <label htmlFor="expected_salary" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Expected Salary(INR)</label>
            </div>
          <div className="relative z-0 w-full mb-5 group">
            <input type="skills" name="skills" id="skills" value={formData.skills} onChange={handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-1500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="skills" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Skills</label>
            </div>

            <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
            <input type="node_experience" name="node_experience" id="node_experience" value={formData.node_experience} onChange={handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-1500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="node_exerience" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Node Js Experience</label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
            <input type="react_experience" name="react_experience" id="react_experience" value={formData.react_experience} onChange={handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-1500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="react_experience" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">React Js Experience</label>
            </div>
                </div>
             <div className="relative z-0 w-full mb-5 group flex items-center">
    <label htmlFor="status" className="w-24 mr-2 text-sm text-gray-500 dark:text-gray-400">Status</label>
    <div className="flex items-center border border-gray-300 rounded-md w-full">
      <select id="status" name="status" value={formData.status} onChange={handleChange} className="block border w-full bg-transparent border-gray-300 rounded-md w-full">
                    {Object.keys(Status).map(key => (
                    <option key={key} value={Status[key as keyof typeof Status]}>
                        {Status[key as keyof typeof Status]}
                    </option>
                    ))}
                </select>
    </div>
  </div>
          <div className="flex justify-between mt-10">
            <button type="button" onClick={closeModal} className="mr-4 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800">Close</button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormModal;
