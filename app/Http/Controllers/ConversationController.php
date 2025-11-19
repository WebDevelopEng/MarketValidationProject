<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Database\Query\Builder;
use App\Models\Conversation;
use App\Models\Message;
use App\Models\User;

class ConversationController extends Controller
{
    /**
     * Get or create a conversation and send a message
     */
    public function SendMessage(Request $request)
    {
        $user = Session::get('account');
        
        $validated = $request->validate([
            'recipient_id' => 'required|integer|exists:users,id',
            'content' => 'required|string'
        ]);

        // Find or create conversation
        $conversation = Conversation::where(function ($query) use ($user, $validated) {
            $query->where('SenderID', $user->id)
                  ->where('ReceiverID', $validated['recipient_id']);
        })
        ->orWhere(function ($query) use ($user, $validated) {
            $query->where('ReceiverID', $user->id)
                  ->where('SenderID', $validated['recipient_id']);
        })
        ->first();

        if (!$conversation) {
            $conversation = Conversation::create([
                'ReceiverID' => $validated['recipient_id'],
                'SenderID' => $user->id
            ]);
        }

        // Create message
        $message = Message::create([
            'content' => $validated['content'],
            'sender' => $user->id,
            'ConvoID' => $conversation->id
        ]);

        return response()->json([
            'success' => true,
            'message' => $message,
            'conversation_id' => $conversation->id
        ]);
    }

    /**
     * Get all conversations for the logged-in user
     */
    public function GetConversations(Request $request)
    {
        $user = Session::get('account');

        $conversations = Conversation::with(['messages' => function ($query) {
            $query->latest();
        }])
        ->where('SenderID', $user->id)
        ->orWhere('ReceiverID', $user->id)
        ->latest('updated_at')
        ->get()
        ->map(function ($conversation) use ($user) {
            $recipient = $conversation->SenderID === $user->id 
                ? User::find($conversation->ReceiverID)
                : User::find($conversation->SenderID);

            return [
                'id' => $conversation->id,
                'recipient' => [
                    'id' => $recipient->id,
                    'name' => $recipient->name,
                    'image' => $recipient->image
                ],
                'last_message' => $conversation->messages->first(),
                'messages' => $conversation->messages
            ];
        });

        return response()->json($conversations);
    }

    /**
     * Get messages for a specific conversation
     */
    public function GetConversationMessages(Request $request, $conversationId)
    {
        $user = Session::get('account');

        $conversation = Conversation::findOrFail($conversationId);

        // Verify user is part of this conversation
        if ($conversation->SenderID !== $user->id && $conversation->ReceiverID !== $user->id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $messages = $conversation->messages()->latest()->get();

        return response()->json($messages);
    }
}

