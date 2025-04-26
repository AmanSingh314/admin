import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  addLink, 
  removeLink, 
  updateLink, 
  reorderLinks,
  resetLinks,
  setLoading, 
  setError    
} from '../features/youtublelink/youtubeLinksSlice';
import { addYoutubeLinks } from '../services/youtubeLinksApi';

const YouTubeLinksManager = ({ usercode }) => {
  const dispatch = useDispatch();
  const { links, loading, error, maxLinks } = useSelector(state => state.youtubeLinks);
  const [newLink, setNewLink] = useState({
    title: '',
    content: '',
    url: ''
  });
  const [draggedItem, setDraggedItem] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLink(prev => ({ ...prev, [name]: value }));
  };

  const handleAddLink = () => {
    if (!newLink.url) return;
    
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
    if (!youtubeRegex.test(newLink.url)) {
      alert('Please enter a valid YouTube URL');
      return;
    }

    dispatch(addLink({
      ...newLink,
      user_code: usercode
    }));
    
    setNewLink({
      title: '',
      content: '',
      url: ''
    });
  };

  const handleRemoveLink = (id) => {
    dispatch(removeLink(id));
  };

  const handleUpdateLink = (id, updates) => {
    dispatch(updateLink({ id, updates }));
  };

  // Drag and Drop handlers
  const handleDragStart = (e, index) => {
    setDraggedItem(links[index]);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.currentTarget);
    e.dataTransfer.setDragImage(e.currentTarget, 20, 20);
  };

  const handleDragOver = (index) => {
    if (draggedItem === null) return;
    
    const draggedOverItem = links[index];
    if (draggedItem.id === draggedOverItem.id) return;

    const items = [...links];
    const draggedItemIndex = items.findIndex(item => item.id === draggedItem.id);
    items.splice(draggedItemIndex, 1);
    items.splice(index, 0, draggedItem);
    
    dispatch(reorderLinks({
      startIndex: draggedItemIndex,
      endIndex: index
    }));
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const handleSubmit = async () => {
    try {
      dispatch(setLoading(true));
      
     
      const linksToSend = links.map(link => ({
        ...link,
        id: link.id || 0, 
        url: link.url.startsWith('http') ? link.url : `https://${link.url}`,
        title: link.title || 'Untitled Video',
        content: link.content || '',
        isactive: true,
        sequence_number: link.sequence_number || links.indexOf(link) + 1
      }));
  
      await addYoutubeLinks(usercode, linksToSend);
      alert('YouTube links saved successfully!');
      dispatch(resetLinks());
    } catch (error) {
      console.error('Save failed:', error);
      dispatch(setError(
        error.message.includes('Validation failed') 
          ? error.message.replace('Validation failed: ', '')
          : 'Failed to save links. Please check your data and try again.'
      ));
    } finally {
      dispatch(setLoading(false));
    }
  };
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">YouTube Links Manager</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md animate-shake">
          {error}
        </div>
      )}
      
      <div className="mb-6 p-4 bg-white rounded-md shadow-sm">
        <h3 className="text-lg font-semibold mb-3 text-gray-700">Add New YouTube Link</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={newLink.title}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Video title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <input
              type="text"
              name="content"
              value={newLink.content}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Video description"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">YouTube URL*</label>
            <input
              type="url"
              name="url"
              value={newLink.url}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="https://www.youtube.com/watch?v=..."
              required
            />
          </div>
        </div>
        
        <button
          onClick={handleAddLink}
          disabled={links.length >= maxLinks || !newLink.url}
          className={`px-4 py-2 rounded-md text-white font-medium transition-all ${links.length >= maxLinks ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {links.length >= maxLinks ? 'Maximum 5 links reached' : 'Add Link'}
        </button>
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3 text-gray-700">Your YouTube Links ({links.length}/{maxLinks})</h3>
        
        {links.length === 0 ? (
          <div className="p-4 bg-gray-100 rounded-md text-center text-gray-500">
            No links added yet. Add your first YouTube link above.
          </div>
        ) : (
          <div className="space-y-3">
            {links.map((link, index) => (
              <div
                key={link.id}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={() => handleDragOver(index)}
                onDragEnd={handleDragEnd}
                className={`p-4 bg-white rounded-md shadow-sm border-l-4 border-blue-500 hover:shadow-md transition-all animate-slide-up ${
                  draggedItem?.id === link.id ? 'opacity-50 bg-gray-100' : ''
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center">
                    <span className="mr-3 text-gray-500 font-medium">#{link.sequence_number}</span>
                    <h4 className="font-medium text-gray-800">
                      <input
                        type="text"
                        value={link.title}
                        onChange={(e) => handleUpdateLink(link.id, { title: e.target.value })}
                        className="bg-transparent border-b border-transparent focus:border-gray-300 focus:outline-none"
                      />
                    </h4>
                  </div>
                  <button
                    onClick={() => handleRemoveLink(link.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                
                <div className="mb-2">
                  <input
                    type="text"
                    value={link.content}
                    onChange={(e) => handleUpdateLink(link.id, { content: e.target.value })}
                    className="w-full bg-transparent border-b border-transparent focus:border-gray-300 focus:outline-none text-sm text-gray-600"
                    placeholder="Description"
                  />
                </div>
                
                <div className="flex items-center">
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2">URL</span>
                  <input
                    type="url"
                    value={link.url}
                    onChange={(e) => handleUpdateLink(link.id, { url: e.target.value })}
                    className="flex-1 bg-transparent border-b border-transparent focus:border-gray-300 focus:outline-none text-sm text-gray-600"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {links.length > 0 && (
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`px-6 py-2 rounded-md text-white font-medium transition-all flex items-center ${loading ? 'bg-blue-400' : 'bg-green-600 hover:bg-green-700'}`}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : 'Save All Links'}
          </button>
        </div>
      )}
    </div>
  );
};

export default YouTubeLinksManager;