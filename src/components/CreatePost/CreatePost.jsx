import * as yup from 'yup'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Button, Grid, TextareaAutosize } from '@material-ui/core'
import ImageUploader from 'react-images-upload'
import { toBase64 } from '../../image_utils'
import { useDispatch } from 'react-redux'
import { setNotification } from '../../reducers/notificationReducer'
import { useAuth0 } from '@auth0/auth0-react'
import SEVERITY from '../../severity'
import './CreatePost.css'
import postService from '../../services/postService'

const postSchema = yup.object().shape({
    description: yup.string()
})

const CreatePost = () => {
    const { user } = useAuth0()
    const dispatch = useDispatch()
    const [image, setImage] = useState(null)

    const formik = useFormik({
        initialValues: {
            description: ''
        },
        validationSchema: postSchema,
        onSubmit: async (values) => {
            if (!image) {
                dispatch(setNotification('Image must be specified', SEVERITY.ERROR))
                return
            }

            const postToProcess = {
                ...values,
                image: await toBase64(image[0]),
                userEmail: user.email,
            }

            try {
                await postService.createPost(postToProcess)
                dispatch(setNotification('Post created successfully', SEVERITY.SUCCESS))
            } catch (e) {
                dispatch(setNotification(e.response.data.message, SEVERITY.ERROR))
            }
        },
        enableReinitialize: true
    })

    return (
        <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <ImageUploader
                        onChange={(i) => setImage(i)}
                        imgExtension={['.jpg', '.png', '.jpeg']}
                        buttonText='Choose image'
                        label='Max file size: 5mb, accepted: jpg, jpeg, png'
                        singleImage={true}
                        buttonType='button'
                        withPreview={true}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextareaAutosize
                        id="description"
                        name="description"
                        placeholder="Post description"
                        rowsMin={11}
                        value={formik.values.description}
                        onChange={formik.handleChange}
                    />
                </Grid>
                <Button color="primary" variant="contained" fullWidth type="submit">
                    Create post
                </Button>
            </Grid>
        </form>
    )
}

export default CreatePost