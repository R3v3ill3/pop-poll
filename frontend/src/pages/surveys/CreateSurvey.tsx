import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, HelpCircle } from 'lucide-react';
import { QUESTION_TYPES, GEOGRAPHY_OPTIONS, STATE_OPTIONS } from '../../config';

interface Question {
  id: string;
  text: string;
  type: string;
  options: string[];
  required: boolean;
  order: number;
}

const CreateSurvey = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [geography, setGeography] = useState('nationwide');
  const [state, setState] = useState('');
  const [targetResponses, setTargetResponses] = useState(2401);
  const [distribution, setDistribution] = useState({
    smsPercentage: 50,
    dynataPercentage: 50,
  });

  const addQuestion = () => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      text: '',
      type: 'multiple_choice',
      options: [''],
      required: true,
      order: questions.length + 1,
    };
    setQuestions([...questions, newQuestion]);
  };

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const updateQuestion = (id: string, updates: Partial<Question>) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, ...updates } : q
    ));
  };

  const addOption = (questionId: string) => {
    setQuestions(questions.map(q =>
      q.id === questionId ? { ...q, options: [...q.options, ''] } : q
    ));
  };

  const removeOption = (questionId: string, optionIndex: number) => {
    setQuestions(questions.map(q =>
      q.id === questionId ? {
        ...q,
        options: q.options.filter((_, index) => index !== optionIndex)
      } : q
    ));
  };

  const updateOption = (questionId: string, optionIndex: number, value: string) => {
    setQuestions(questions.map(q =>
      q.id === questionId ? {
        ...q,
        options: q.options.map((opt, index) =>
          index === optionIndex ? value : opt
        )
      } : q
    ));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real application, this would make an API call to create the survey
    console.log({
      title,
      description,
      questions,
      targetAudience: {
        geography,
        state: geography === 'state' ? state : undefined,
      },
      targetResponses,
      distribution,
    });

    // Navigate back to surveys list
    navigate('/surveys');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Create New Survey</h1>
        <p className="mt-2 text-sm text-gray-600">
          Design your survey with the form below. Add questions, set your target audience,
          and configure distribution settings.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
          <div className="px-4 py-6 sm:p-8">
            <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
              <div className="col-span-full">
                <label htmlFor="title" className="form-label">
                  Survey Title
                </label>
                <input
                  type="text"
                  id="title"
                  className="form-input"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="col-span-full">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  id="description"
                  rows={3}
                  className="form-input"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Questions */}
        <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
          <div className="px-4 py-6 sm:p-8">
            <div className="space-y-8">
              <div>
                <h2 className="text-lg font-medium text-gray-900">Questions</h2>
                <p className="mt-1 text-sm text-gray-600">
                  Add the questions you want to ask in your survey.
                </p>
              </div>

              {questions.map((question, index) => (
                <div
                  key={question.id}
                  className="relative rounded-lg border border-gray-200 p-4"
                >
                  <div className="absolute right-4 top-4">
                    <button
                      type="button"
                      onClick={() => removeQuestion(question.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="form-label">
                        Question {index + 1}
                      </label>
                      <input
                        type="text"
                        className="form-input"
                        value={question.text}
                        onChange={(e) =>
                          updateQuestion(question.id, { text: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="form-label">Type</label>
                        <select
                          className="form-input"
                          value={question.type}
                          onChange={(e) =>
                            updateQuestion(question.id, { type: e.target.value })
                          }
                        >
                          {QUESTION_TYPES.map((type) => (
                            <option key={type.value} value={type.value}>
                              {type.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="form-label">Required</label>
                        <select
                          className="form-input"
                          value={question.required.toString()}
                          onChange={(e) =>
                            updateQuestion(question.id, {
                              required: e.target.value === 'true',
                            })
                          }
                        >
                          <option value="true">Yes</option>
                          <option value="false">No</option>
                        </select>
                      </div>
                    </div>

                    {(question.type === 'multiple_choice' ||
                      question.type === 'likert') && (
                      <div>
                        <label className="form-label">Options</label>
                        <div className="space-y-2">
                          {question.options.map((option, optionIndex) => (
                            <div key={optionIndex} className="flex gap-2">
                              <input
                                type="text"
                                className="form-input"
                                value={option}
                                onChange={(e) =>
                                  updateOption(
                                    question.id,
                                    optionIndex,
                                    e.target.value
                                  )
                                }
                                placeholder={`Option ${optionIndex + 1}`}
                                required
                              />
                              <button
                                type="button"
                                onClick={() =>
                                  removeOption(question.id, optionIndex)
                                }
                                className="text-gray-400 hover:text-red-500"
                                disabled={question.options.length <= 1}
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() => addOption(question.id)}
                            className="btn btn-outline text-sm"
                          >
                            <Plus size={16} className="mr-1" />
                            Add Option
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={addQuestion}
                className="btn btn-outline w-full"
              >
                <Plus size={16} className="mr-1" />
                Add Question
              </button>
            </div>
          </div>
        </div>

        {/* Target Audience */}
        <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
          <div className="px-4 py-6 sm:p-8">
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-medium text-gray-900">
                  Target Audience
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                  Define the geographic scope of your survey.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="geography" className="form-label">
                    Geographic Scope
                  </label>
                  <select
                    id="geography"
                    className="form-input"
                    value={geography}
                    onChange={(e) => setGeography(e.target.value)}
                  >
                    {GEOGRAPHY_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {geography === 'state' && (
                  <div className="sm:col-span-3">
                    <label htmlFor="state" className="form-label">
                      State
                    </label>
                    <select
                      id="state"
                      className="form-input"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      required
                    >
                      <option value="">Select a state</option>
                      {STATE_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Survey Settings */}
        <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
          <div className="px-4 py-6 sm:p-8">
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-medium text-gray-900">
                  Survey Settings
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                  Configure your survey's sample size and distribution channels.
                </p>
              </div>

              <div>
                <label htmlFor="targetResponses" className="form-label">
                  Target Responses
                </label>
                <div className="mt-1 flex items-center gap-2">
                  <input
                    type="number"
                    id="targetResponses"
                    className="form-input"
                    min="100"
                    value={targetResponses}
                    onChange={(e) =>
                      setTargetResponses(parseInt(e.target.value, 10))
                    }
                    required
                  />
                  <div className="relative">
                    <button
                      type="button"
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <HelpCircle size={16} />
                    </button>
                  </div>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  Recommended: 2,401 responses for ±2% margin of error at 95%
                  confidence level
                </p>
              </div>

              <div>
                <label className="form-label">Distribution Channels</label>
                <div className="mt-4 space-y-4">
                  <div>
                    <label
                      htmlFor="smsPercentage"
                      className="mb-1 block text-sm font-medium text-gray-700"
                    >
                      SMS Panel ({distribution.smsPercentage}%)
                    </label>
                    <input
                      type="range"
                      id="smsPercentage"
                      min="0"
                      max="100"
                      value={distribution.smsPercentage}
                      onChange={(e) => {
                        const smsValue = parseInt(e.target.value, 10);
                        setDistribution({
                          smsPercentage: smsValue,
                          dynataPercentage: 100 - smsValue,
                        });
                      }}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="dynataPercentage"
                      className="mb-1 block text-sm font-medium text-gray-700"
                    >
                      Dynata Panel ({distribution.dynataPercentage}%)
                    </label>
                    <input
                      type="range"
                      id="dynataPercentage"
                      min="0"
                      max="100"
                      value={distribution.dynataPercentage}
                      onChange={(e) => {
                        const dynataValue = parseInt(e.target.value, 10);
                        setDistribution({
                          smsPercentage: 100 - dynataValue,
                          dynataPercentage: dynataValue,
                        });
                      }}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate('/surveys')}
            className="btn btn-outline"
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Create Survey
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateSurvey;