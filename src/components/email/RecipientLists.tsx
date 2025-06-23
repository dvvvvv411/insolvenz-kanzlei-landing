
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { Plus, Edit, Trash2, Users, Upload } from 'lucide-react';

interface RecipientList {
  id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

interface Recipient {
  id: string;
  list_id: string;
  email: string;
  first_name: string;
  last_name: string;
  created_at: string;
}

const RecipientLists = () => {
  const [lists, setLists] = useState<RecipientList[]>([]);
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showListForm, setShowListForm] = useState(false);
  const [showRecipientForm, setShowRecipientForm] = useState(false);
  const [selectedList, setSelectedList] = useState<string | null>(null);
  const [editingList, setEditingList] = useState<RecipientList | null>(null);
  const [listFormData, setListFormData] = useState({
    name: '',
    description: ''
  });
  const [recipientFormData, setRecipientFormData] = useState({
    email: '',
    first_name: '',
    last_name: ''
  });

  useEffect(() => {
    fetchLists();
  }, []);

  useEffect(() => {
    if (selectedList) {
      fetchRecipients(selectedList);
    }
  }, [selectedList]);

  const fetchLists = async () => {
    try {
      const { data, error } = await supabase
        .from('recipient_lists')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLists(data || []);
    } catch (error) {
      console.error('Error fetching lists:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch recipient lists.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRecipients = async (listId: string) => {
    try {
      const { data, error } = await supabase
        .from('recipients')
        .select('*')
        .eq('list_id', listId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRecipients(data || []);
    } catch (error) {
      console.error('Error fetching recipients:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch recipients.',
        variant: 'destructive'
      });
    }
  };

  const handleListSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingList) {
        const { error } = await supabase
          .from('recipient_lists')
          .update({
            name: listFormData.name,
            description: listFormData.description,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingList.id);

        if (error) throw error;
        
        toast({
          title: 'Success',
          description: 'List updated successfully.'
        });
      } else {
        const { error } = await supabase
          .from('recipient_lists')
          .insert([listFormData]);

        if (error) throw error;
        
        toast({
          title: 'Success',
          description: 'List created successfully.'
        });
      }

      setListFormData({ name: '', description: '' });
      setShowListForm(false);
      setEditingList(null);
      fetchLists();
    } catch (error) {
      console.error('Error saving list:', error);
      toast({
        title: 'Error',
        description: 'Failed to save list.',
        variant: 'destructive'
      });
    }
  };

  const handleRecipientSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedList) return;

    try {
      const { error } = await supabase
        .from('recipients')
        .insert([{
          ...recipientFormData,
          list_id: selectedList
        }]);

      if (error) throw error;
      
      toast({
        title: 'Success',
        description: 'Recipient added successfully.'
      });

      setRecipientFormData({ email: '', first_name: '', last_name: '' });
      setShowRecipientForm(false);
      fetchRecipients(selectedList);
    } catch (error) {
      console.error('Error adding recipient:', error);
      toast({
        title: 'Error',
        description: 'Failed to add recipient.',
        variant: 'destructive'
      });
    }
  };

  const handleDeleteList = async (id: string) => {
    if (!confirm('Are you sure you want to delete this list and all its recipients?')) return;

    try {
      const { error } = await supabase
        .from('recipient_lists')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'List deleted successfully.'
      });
      
      if (selectedList === id) {
        setSelectedList(null);
        setRecipients([]);
      }
      fetchLists();
    } catch (error) {
      console.error('Error deleting list:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete list.',
        variant: 'destructive'
      });
    }
  };

  const handleDeleteRecipient = async (id: string) => {
    if (!confirm('Are you sure you want to remove this recipient?')) return;

    try {
      const { error } = await supabase
        .from('recipients')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Recipient removed successfully.'
      });
      
      if (selectedList) {
        fetchRecipients(selectedList);
      }
    } catch (error) {
      console.error('Error deleting recipient:', error);
      toast({
        title: 'Error',
        description: 'Failed to remove recipient.',
        variant: 'destructive'
      });
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading recipient lists...</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Recipient Lists */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Recipient Lists</h3>
          <Button onClick={() => setShowListForm(true)} className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>New List</span>
          </Button>
        </div>

        {showListForm && (
          <Card>
            <CardHeader>
              <CardTitle>{editingList ? 'Edit List' : 'Create New List'}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleListSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">List Name</label>
                  <Input
                    value={listFormData.name}
                    onChange={(e) => setListFormData({ ...listFormData, name: e.target.value })}
                    placeholder="Newsletter Subscribers"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <Textarea
                    value={listFormData.description}
                    onChange={(e) => setListFormData({ ...listFormData, description: e.target.value })}
                    placeholder="Description of this recipient list..."
                    rows={3}
                  />
                </div>
                
                <div className="flex space-x-2">
                  <Button type="submit">
                    {editingList ? 'Update List' : 'Create List'}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => {
                      setShowListForm(false);
                      setEditingList(null);
                      setListFormData({ name: '', description: '' });
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="space-y-4">
          {lists.map((list) => (
            <Card 
              key={list.id} 
              className={`cursor-pointer transition-colors ${
                selectedList === list.id ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => setSelectedList(list.id)}
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{list.name}</CardTitle>
                    <CardDescription className="mt-1">{list.description}</CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingList(list);
                        setListFormData({
                          name: list.name,
                          description: list.description || ''
                        });
                        setShowListForm(true);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteList(list.id);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>

        {lists.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-gray-500">No recipient lists found.</p>
              <Button onClick={() => setShowListForm(true)} className="mt-4">
                Create Your First List
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Recipients */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">
            Recipients {selectedList && `(${recipients.length})`}
          </h3>
          {selectedList && (
            <Button 
              onClick={() => setShowRecipientForm(true)} 
              className="flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add Recipient</span>
            </Button>
          )}
        </div>

        {!selectedList ? (
          <Card>
            <CardContent className="text-center py-8">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Select a list to view recipients</p>
            </CardContent>
          </Card>
        ) : (
          <>
            {showRecipientForm && (
              <Card>
                <CardHeader>
                  <CardTitle>Add New Recipient</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleRecipientSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Email Address</label>
                      <Input
                        type="email"
                        value={recipientFormData.email}
                        onChange={(e) => setRecipientFormData({ ...recipientFormData, email: e.target.value })}
                        placeholder="user@example.com"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">First Name</label>
                        <Input
                          value={recipientFormData.first_name}
                          onChange={(e) => setRecipientFormData({ ...recipientFormData, first_name: e.target.value })}
                          placeholder="John"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Last Name</label>
                        <Input
                          value={recipientFormData.last_name}
                          onChange={(e) => setRecipientFormData({ ...recipientFormData, last_name: e.target.value })}
                          placeholder="Doe"
                        />
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button type="submit">Add Recipient</Button>
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => {
                          setShowRecipientForm(false);
                          setRecipientFormData({ email: '', first_name: '', last_name: '' });
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            <div className="space-y-2">
              {recipients.map((recipient) => (
                <Card key={recipient.id}>
                  <CardContent className="py-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{recipient.email}</p>
                        {(recipient.first_name || recipient.last_name) && (
                          <p className="text-sm text-gray-500">
                            {recipient.first_name} {recipient.last_name}
                          </p>
                        )}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteRecipient(recipient.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {recipients.length === 0 && (
              <Card>
                <CardContent className="text-center py-8">
                  <p className="text-gray-500">No recipients in this list.</p>
                  <Button onClick={() => setShowRecipientForm(true)} className="mt-4">
                    Add First Recipient
                  </Button>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default RecipientLists;
