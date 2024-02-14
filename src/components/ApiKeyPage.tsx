import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  Platform,
  ViewStyle,
  KeyboardAvoidingView,
} from 'react-native'
import Button from './Button'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { navigateToCamera } from '../helpers/cameraHelpers'
import { useTheme } from '../hooks/useTheme'
import { isValid } from '../helpers/keyHelpers'
import { Layout } from './Layout'

export function ApiKeyPage({ navigation }: { navigation: any }) {
  const theme = useTheme()

  const [apiKey, setApiKey] = React.useState('')
  const [focused, setFocused] = React.useState(false)

  const textInputRef = React.useRef<TextInput>(null)

  const showError = apiKey.length > 0 && !isValid(apiKey)

  return (
    <Layout
      style={{
        flex: 1,
        backgroundColor: theme.colors.foreground,
        padding: theme.spacing.l,
      }}
    >
      <KeyboardAvoidingView behavior="padding" style={{ flex: 7, rowGap: theme.spacing.m }}>
        <View
          style={{
            flex: 3,
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: theme.spacing.m,
          }}
        >
          <Image
            style={{
              width: 124,
              height: 61,
            }}
            source={require('../../assets/images/key.png')}
          />
          <Text style={[theme.textVariants.subHeader, { color: theme.colors.background }]}>
            OpenAI Key
          </Text>
        </View>
        <View style={{ flex: 4, justifyContent: 'space-between' }}>
          <View style={{ rowGap: theme.spacing.m }}>
            <Text
              style={[
                theme.textVariants.small,

                {
                  color: theme.colors.background,
                },
              ]}
            >
              Your API Key is stored locally on your browser and never sent anywhere else.
            </Text>
            <TextInput
              ref={textInputRef}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              onChangeText={setApiKey}
              value={apiKey}
              placeholder="sk-xxxxxxxxxxxxxxxx"
              autoComplete="off"
              autoCorrect={false}
              selectionColor={theme.colors.primary}
              style={
                [
                  styles.textInput,
                  theme.textVariants.body,
                  {
                    borderColor: theme.colors[showError ? 'danger' : 'background'],
                    borderWidth: focused ? 2 : 1,
                    padding: theme.spacing.m,
                    color: `${theme.colors[showError ? 'danger' : 'background']}${
                      apiKey ? '' : '80'
                    }`,
                  },
                  Platform.OS === 'web' ? { outlineStyle: 'none' } : null,
                ] as ViewStyle
              }
            />
            {showError && (
              <Text
                style={[
                  theme.textVariants.small,
                  { color: theme.colors.danger, textAlign: 'center' },
                ]}
              >
                invalid format
              </Text>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
      <Button
        type="primary"
        disabled={!isValid(apiKey)}
        onPress={async () => {
          await AsyncStorage.setItem('openAIKey', apiKey)
          await navigateToCamera(navigation)
        }}
      >
        Save and Scan
      </Button>
    </Layout>
  )
}

const styles = StyleSheet.create({
  textInput: {
    borderRadius: 36,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    textAlign: 'center',
  },
})
