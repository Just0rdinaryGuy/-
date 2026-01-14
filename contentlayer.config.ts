import { defineDocumentType, makeSource } from 'contentlayer/source-files'

export const Project = defineDocumentType(() => ({
    name: 'Project',
    filePathPattern: `projects/**/*.mdx`,
    contentType: 'mdx',
    fields: {
        title: { type: 'string', required: true },
        description: { type: 'string', required: true },
        date: { type: 'date', required: true },
        image: { type: 'string', required: true },
        tags: { type: 'list', of: { type: 'string' }, required: true },
        repositoryUrl: { type: 'string', required: false },
        demoUrl: { type: 'string', required: false },
    },
    computedFields: {
        slug: {
            type: 'string',
            resolve: (doc) => doc._raw.flattenedPath.split('/').pop(),
        },
    },
}))

export default makeSource({
    contentDirPath: 'content',
    documentTypes: [Project],
})
