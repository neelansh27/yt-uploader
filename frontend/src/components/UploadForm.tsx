// components/UploadForm.tsx
import React, { useState } from 'react';

interface GeneratedContent {
    tags: string[];
    title: string;
    description: string;
}

const UploadForm: React.FC = () => {
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [miniDescription, setMiniDescription] = useState('');
    const [generated, setGenerated] = useState<GeneratedContent | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [scheduledTime, setScheduledTime] = useState('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setVideoFile(e.target.files[0]);
        }
    };

    const handleGenerate = async () => {
        if (!miniDescription || !videoFile) {
            alert("Please provide both video file and mini description");
            return;
        }

        setIsSubmitting(true);

        fetch(`${import.meta.env.VITE_BACKEND_URL}/video/metadata`, {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt: miniDescription})
        }).then((res)=> {
            // console.log(res)
            return res.json();
        }).then((data) => {
            console.log(data);
            setGenerated(data);
        })
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        if (!generated || !scheduledTime) {
            alert("Complete the form before submitting.");
            return;
        }

        const formData = new FormData();
        formData.append('video', videoFile!);
        formData.append('tags', generated.tags.join(','));
        formData.append('title', generated.title);
        formData.append('description', generated.description);
        // Converting date to RFC 3339 format
        formData.append('scheduledTime', new Date(scheduledTime).toISOString());

        fetch(`${import.meta.env.VITE_BACKEND_URL}/video/schedule`, {
            method: 'POST',
            credentials: "include",
            body: formData,
        }).then(res => res.json()).then((data) => {
            if (data.success) {
                alert("Successfully scheduled video");
            } else {
                alert(`Failed to submit video: ${JSON.stringify(data)}`);
            }
        }).finally(() => {
            setIsSubmitting(false);
        })
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-2xl mx-auto p-8 bg-white shadow-xl rounded-2xl space-y-8 border border-gray-200"
        >
            <h2 className="text-2xl font-semibold text-gray-800">Upload Your Video</h2>

            <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Video File</label>
                <input
                    type="file"
                    accept="video/*"
                    onChange={handleFileChange}
                    disabled={isSubmitting}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 disabled:opacity-60"
                />
            </div>

            <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Mini Description</label>
                <textarea
                    disabled={isSubmitting}
                    value={miniDescription}
                    onChange={(e) => setMiniDescription(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 disabled:opacity-60"
                    rows={4}
                />
            </div>

            {!generated && (
                <button
                    type="button"
                    onClick={handleGenerate}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200"
                >
                    Generate Tags & Description
                </button>
            )}

            {generated && (
                <>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <div className="mt-1 text-base font-semibold text-gray-800 bg-gray-100 p-2 rounded-lg border border-gray-200">
                            {generated.title}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Generated Description</label>
                        <div className="mt-1 whitespace-pre-wrap text-gray-700 text-sm bg-gray-50 p-3 border border-gray-200 rounded-lg">
                            {generated.description}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Tags</label>
                        <div className="mt-2 flex flex-wrap gap-2">
                            {generated.tags.map((tag, idx) => (
                                <span
                                    key={idx}
                                    className="bg-blue-100 text-blue-700 px-3 py-1 text-sm rounded-full"
                                >
              {tag}
            </span>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">Schedule Upload</label>
                        <input
                            type="datetime-local"
                            value={scheduledTime}
                            onChange={(e) => setScheduledTime(e.target.value)}
                            disabled={isSubmitting}
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50 disabled:opacity-60"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200 mt-4"
                    >
                        Upload Video
                    </button>
                </>
            )}
        </form>
    );
};

export default UploadForm;