<template>
    <table class="min-w-full border-collapse">
        <thead>
            <tr>
                <th class="border px-4 py-2 text-left">Name</th>
                <th class="border px-4 py-2 text-left">Email</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="user in users" :key="user.id">
                <td class="border px-4 py-2">{{ user.name }}</td>
                <td class="border px-4 py-2">{{ user.email }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>
import { ref } from 'vue';

const users = ref([
    { id: 1, name: 'Alice Smith', email: 'alice@example.com' },
    { id: 2, name: 'Bob Johnson', email: 'bob@example.com' },
    // Add more user data as needed
]);
</script>
