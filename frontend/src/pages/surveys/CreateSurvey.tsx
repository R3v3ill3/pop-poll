import React, { useState } from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';

export default function CreateSurvey() {
  const [surveyTitle, setSurveyTitle] = useState('');
  const [questions, setQuestions] = useState([{ text: '', type: 'text' }]);

  const addQuestion = () => {
    setQuestions([...questions, { text: '', type: 'text' }]);
  };

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement survey creation logic
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Create New Survey</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="mb-6">
            <label htmlFor="surveyTitle" className="block text-sm font-medium text-gray-700 mb-2">
              Survey Title
            </label>
            <input
              type="text"
              id="surveyTitle"
              value={surveyTitle}
              onChange={(e) => setSurveyTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter survey title"
              required
            />
          </div>

          <div className="space-y-6">
            {questions.map((question, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg relative">
                <button
                  type="button"
                  onClick={() => removeQuestion(index)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Question {index + 1}
                  </label>
                  <input
                    type="text"
                    value={question.text}
                    onChange={(e) => {
                      const newQuestions = [...questions];
                      newQuestions[index].text = e.target.value;
                      setQuestions(newQuestions);
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your question"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Answer Type
                  </label>
                  <select
                    value={question.type}
                    onChange={(e) => {
                      const newQuestions = [...questions];
                      newQuestions[index].type = e.target.value;
                      setQuestions(newQuestions);
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="text">Text</option>
                    <option value="number">Number</option>
                    <option value="choice">Multiple Choice</option>
                  </select>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addQuestion}
            className="mt-4 inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            <PlusCircle className="w-5 h-5 mr-2" />
            Add Question
          </button>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Create Survey
          </button>
        </div>
      </form>
    </div>
  );
}