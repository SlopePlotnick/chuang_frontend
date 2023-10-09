<template>
    <div class="mb-3">
        <label for="formFile" class="form-label">Default file input example</label>
        <input v-on="file" class="form-control" type="file" id="formFile">
    </div>
</template>

<script>
import { ref } from 'vue';

export default {
    name: 'AddFileView',
    setup: () => {
        let file = ref('');

        console.log(typeof (file.value));
        console.log('完成上传');
    }
}
</script>

<style scoped></style>