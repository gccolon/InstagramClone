import * as FileSystem from 'expo-file-system'
import PropTypes from 'prop-types'
import React, { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, Image, View } from 'react-native'




const CachedImage = props => {
  const { source: { uri }, cacheKey, style } = props
  const filesystemURI = `${FileSystem.cacheDirectory}${cacheKey}`

  const [imgURI, setImgURI] = useState(filesystemURI)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const componentIsMounted = useRef(true)

  useEffect(() => {
    const loadImage = async ({ fileURI }) => {
      try {
        // Use the cached image if it exists
        const metadata = await FileSystem.getInfoAsync(fileURI)
        if (!metadata.exists) {
          // download to cache
          if (componentIsMounted.current) {
            setImgURI(null)
            setLoading(true)
            await FileSystem.downloadAsync(
              uri,
              fileURI
            )
          }
          if (componentIsMounted.current) {
            setImgURI(fileURI)
          }
        }
        if (componentIsMounted.current) {
          setLoading(false)
        }
      } catch (err) {
        console.error('Error loading cached image:', err)
        if (componentIsMounted.current) {
          setImgURI(uri) // Fallback to original URI
          setError(true)
          setLoading(false)
        }
      }
    }

    loadImage({ fileURI: filesystemURI })

    return () => {
      componentIsMounted.current = false
    }
  }, [uri, filesystemURI])// eslint-disable-line react-hooks/exhaustive-deps

  if (loading && !imgURI) {
    return (
      <View style={[style, { justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f0f0' }]}>
        <ActivityIndicator size="small" color="#999" />
      </View>
    )
  }

  return (
    <Image
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      source={{
        uri: imgURI,
      }}
      onLoadStart={() => setLoading(true)}
      onLoadEnd={() => setLoading(false)}
      onError={(e) => {
        console.error('Image load error:', e.nativeEvent.error)
        setError(true)
        setLoading(false)
      }}
    />
  )
}

CachedImage.propTypes = {
  source: PropTypes.object.isRequired,
  cacheKey: PropTypes.string.isRequired,
}

export default CachedImage
